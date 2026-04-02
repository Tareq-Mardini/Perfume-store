import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { useParams } from "react-router-dom";
export default function SpecificProduct() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <div>
        <h2>Product ID: {id}</h2>
      </div>
      <Footer />
    </>
  );
}
