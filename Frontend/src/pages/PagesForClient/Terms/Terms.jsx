import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import "./Terms.css";
export default function Terms() {
  return (
    <>
      <Navbar />

      <div class="page-header">
        <div class="section-label">Legal</div>
        <h1>Terms & Conditions</h1>
        <p>Please read these terms carefully before placing an order.</p>
      </div>

      <div class="container" style={{ maxWidth: "900px" }}>
        <div class="legal-card">
          <h2>
            <span class="legal-num">1</span> Company Information
          </h2>
          <p>
            Munaryss Trading LLC is committed to protecting customer privacy and
            providing a safe shopping experience in accordance with UAE laws.
          </p>
          <ul>
            <li>
              <strong>Legal Name:</strong> Munaryss Trading LLC
            </li>
            <li>
              <strong>Emirate:</strong> Dubai
            </li>
            <li>
              <strong>Trade License No:</strong> 1582680
            </li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">2</span> Data Collection
          </h2>
          <p>We collect minimal data such as:</p>
          <ul>
            <li>Full name</li>
            <li>Phone number</li>
            <li>Delivery address</li>
            <li>Technical data</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">3</span> Use of Data
          </h2>
          <p>Data is used for the following purposes:</p>
          <ul>
            <li>Order processing</li>
            <li>Customer communication</li>
            <li>Service improvement</li>
            <li>Fraud prevention</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">4</span> Payment Policy
          </h2>
          <ul>
            <li>Cash on Delivery (COD)</li>
            <li>Card Payment</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">5</span> Shipping Policy
          </h2>
          <ul>
            <li>
              <strong>UAE:</strong> 1–2 business days
            </li>
            <li>
              <strong>GCC:</strong> 4–5 business days
            </li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">6</span> Return & Exchange Policy
          </h2>
          <p>Returns are accepted within 3 days if the product is:</p>
          <ul>
            <li>Unopened</li>
            <li>Unused</li>
            <li>In original condition</li>
          </ul>

          <p>
            <strong>Refunds:</strong>
          </p>
          <ul>
            <li>
              If returned unopened: Customer pays delivery fees, and shipping or
              service charges will be deducted from the refund.
            </li>
            <li>
              If opened: No return unless there is a manufacturing defect.
            </li>
          </ul>

          <p>
            <strong>Exchanges:</strong>
          </p>
          <ul>
            <li>If unopened: Customer pays delivery cost again.</li>
            <li>If defective: Company covers all costs.</li>
            <li>All returns are subject to inspection.</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">7</span> Data Sharing
          </h2>
          <p>
            Customer data is shared only with trusted partners under strict
            protection agreements.
          </p>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">8</span> Data Security
          </h2>
          <ul>
            <li>SSL encryption</li>
            <li>Access control</li>
            <li>Regular system updates</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">9</span> Disclaimer
          </h2>
          <ul>
            <li>For external use only</li>
            <li>Avoid eye contact</li>
            <li>Test before use</li>
            <li>Keep away from children</li>
            <li>Store away from heat</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">10</span> Important Notes
          </h2>
          <ul>
            <li>Fragrance may vary depending on skin type</li>
            <li>Longevity varies per person</li>
            <li>May be affected by environment, climate, and clothing</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">11</span> Your Rights
          </h2>
          <ul>
            <li>Access your data</li>
            <li>Modify or delete your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>

        <div class="legal-card">
          <h2>
            <span class="legal-num">12</span> Contact
          </h2>
          <ul>
            <li>
              <strong>WhatsApp:</strong> +971507205277
            </li>
            <li>
              <strong>Email:</strong> info@munaryss.com
            </li>
          </ul>
          <p>All rights reserved © Munaryss</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
