import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getProductImages,
  uploadProductImages,
  deleteProductImage,
  setImageAsPrimary,
} from "../../../../../services/productsService";
import { Link } from "react-router-dom";
import styles from "./EditImages.module.css";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function EditImages() {
  const { t } = useTranslation();
  const [settingPrimaryId, setSettingPrimaryId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // للصور الجديدة المختارة
  const [selectedFiles, setSelectedFiles] = useState([]); // { file, preview }
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const fileInputRef = useRef();

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getProductImages(id);
      setImages(data);
    } catch {
      setError("فشل تحميل الصور");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [id]);

  // لما يختار صور جديدة
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = ""; // reset input مشان يقدر يختار نفس الصورة مرة ثانية
  };

  // حذف صورة من الـ preview قبل الرفع
  const handleRemoveSelected = (fileId) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // رفع الصور
  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    setUploading(true);
    setUploadError(null);
    try {
      await uploadProductImages(
        id,
        selectedFiles.map((f) => f.file),
      );
      setSelectedFiles([]);
      await fetchImages(); // تحديث القائمة
    } catch {
      setUploadError("فشل رفع الصور، حاول مرة ثانية");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    setDeletingId(imageId);
    try {
      await deleteProductImage(imageId);
      await fetchImages();
    } catch {
      // ممكن تضيف error state إذا بدك
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetPrimary = async (imageId) => {
    if (settingPrimaryId) return;
    setSettingPrimaryId(imageId);
    try {
      await setImageAsPrimary(imageId);
      await fetchImages();
    } catch {
      // ممكن تضيف error state
    } finally {
      setSettingPrimaryId(null);
    }
  };

  if (loading) return <div className={styles.loading}>جاري التحميل...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      {" "}
      <Helmet>
        <title>Munaryss | Products</title>
      </Helmet>
      <div style={{ paddingTop: "0px" }} className={styles.container}>
        <div className={styles.header}>
          <div>
            {" "}
            <Link to="/admin/products">
              <button className={styles.btnBack}>
                ← {t("adminProducts.title")} {t("adminProducts.highlight")}
              </button>
            </Link>
          </div>
          <div>
            {" "}
            <button
              className={styles.addBtn}
              onClick={() => fileInputRef.current.click()}
            >
              <span>+</span> إضافة صور
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Preview الصور الجديدة المختارة */}
        {selectedFiles.length > 0 && (
          <div className={styles.uploadSection}>
            <h3 className={styles.uploadTitle}>
              صور جديدة للرفع ({selectedFiles.length})
            </h3>
            <div className={styles.previewGrid}>
              {selectedFiles.map((f) => (
                <div key={f.id} className={styles.previewCard}>
                  <img src={f.preview} alt="preview" className={styles.image} />
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveSelected(f.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {uploadError && <p className={styles.uploadError}>{uploadError}</p>}

            <button
              className={styles.uploadBtn}
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "جاري الرفع..." : `رفع ${selectedFiles.length} صورة`}
            </button>
          </div>
        )}

        {/* صور المنتج الحالية */}
        <div className={styles.grid}>
          {images.map((img) => (
            <div
              key={img.id}
              className={`${styles.card} ${img.is_primary ? styles.primary : ""}`}
            >
              {img.is_primary && (
                <div className={styles.primaryBadge}>✓ Primary</div>
              )}
              <img
                src={img.image}
                alt={`product-${img.id}`}
                className={`${styles.image} ${!img.is_primary ? styles.clickable : ""}`}
                onClick={() => !img.is_primary && handleSetPrimary(img.id)}
                title={!img.is_primary ? "اضغط لتعيينها كـ Primary" : ""}
              />

              {/* مؤشر loading فوق الصورة أثناء التحديث */}
              {settingPrimaryId === img.id && (
                <div className={styles.loadingOverlay}>
                  <span className={styles.spinner} />
                </div>
              )}

              {/* زر الحذف */}
              <button
                className={`${styles.deleteBtn} ${deletingId === img.id ? styles.deleting : ""}`}
                onClick={() => handleDelete(img.id)}
                disabled={deletingId === img.id}
                title="حذف الصورة"
              >
                {deletingId === img.id ? "..." : "🗑"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
