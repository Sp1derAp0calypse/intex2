import { useNavigate } from "react-router-dom";

function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto text-white text-left !text-left">
      <div className="header-buttons" onClick={() => navigate(-1)}>
        <button className="nav-button">Go back</button>
      </div>
      <br />
      <h1 className="text-3xl font-bold mb-6">
        Terms of Use and Privacy Statement
      </h1>
      <p className="mb-4">
        Welcome to CineNiche — your gateway to curated, hard-to-find cinema from
        around the world. These Terms of Use and Privacy Statement ("Terms")
        govern your access and interaction with the CineNiche experience,
        including our website, mobile apps, and smart TV applications across
        various platforms (the “Service”).
      </p>
      <p className="mb-4">
        CineNiche, Inc. is the provider of this Service. For questions about
        these Terms or our privacy practices, please contact us at{" "}
        <a
          href="mailto:support@cineniche.com"
          className="text-blue-600 underline"
        >
          support@cineniche.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Eligibility and Intended Use
      </h2>
      <p className="mb-2">
        You must be at least 18 years old to use the CineNiche Service. The
        Service is provided for personal, non-commercial use only. We grant you
        a limited, non-exclusive, non-transferable license to access CineNiche
        content during your active subscription.
      </p>
      <p className="mb-2">By using the Service, you agree not to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Reproduce, distribute, or publicly display our content.</li>
        <li>Circumvent security or content protections.</li>
        <li>
          Use automated tools (bots, scrapers, etc.) to access the Service.
        </li>
        <li>Upload harmful content or interfere with system functionality.</li>
      </ul>
      <p className="mb-4">
        We may suspend or terminate access if these terms are violated.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Collection and Use of Information
      </h2>
      <p className="mb-2">
        To deliver and improve your experience, we (and our Service Providers)
        may collect the following types of information:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <strong>Identifiers</strong> (IP address, device ID, etc.)
        </li>
        <li>
          <strong>Device and activity data</strong> (OS, browser type,
          interaction data)
        </li>
        <li>
          <strong>Geolocation data</strong> (IP-based or GPS-based, where
          applicable)
        </li>
      </ul>
      <p className="mb-2">This information is used to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Stream content efficiently</li>
        <li>Improve platform performance</li>
        <li>Personalize your experience</li>
        <li>Provide customer support</li>
        <li>Monitor service security</li>
      </ul>
      <p className="mb-4">
        Some of this data is collected using cookies, pixel tags, and similar
        tracking technologies. You can manage cookie preferences via your
        browser settings. Disabling cookies may affect Service functionality.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Third-Party Services and Analytics
      </h2>
      <p className="mb-4">
        CineNiche may use tools like <strong>Google Analytics</strong> to
        understand how users interact with the Service. These tools may collect
        and process information on our behalf. For more information, see
        Google’s privacy policy at{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Email Communication</h2>
      <p className="mb-4">
        If you opt-in to receive CineNiche emails, you can unsubscribe at any
        time via the “unsubscribe” link in any email. We may still send
        essential service-related notifications (e.g., account or subscription
        updates).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Security and Data Retention
      </h2>
      <p className="mb-4">
        We implement reasonable administrative, technical, and physical
        safeguards to protect your personal information from loss, misuse, or
        unauthorized access. Your data is retained only as necessary to fulfill
        the purposes described in these Terms or as required by law.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Sharing and Disclosure
      </h2>
      <p className="mb-2">We may share your information with:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <strong>CineNiche-affiliated companies</strong> for support and
          service development
        </li>
        <li>
          <strong>Service Providers</strong> (e.g., hosting, analytics, customer
          support)
        </li>
        <li>
          <strong>Legal or government entities</strong> if required by law
        </li>
        <li>
          <strong>Entities involved in mergers or business transfers</strong>
        </li>
      </ul>
      <p className="mb-4">
        If your data is transferred internationally, we ensure adequate
        protections are in place per applicable laws.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Your Privacy Rights</h2>
      <p className="mb-2">You may have the right to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Access or correct your personal data</li>
        <li>Request data deletion or restriction</li>
        <li>Object to processing</li>
        <li>Withdraw consent</li>
      </ul>
      <p className="mb-4">
        To exercise your rights, email{" "}
        <a
          href="mailto:privacy@cineniche.com"
          className="text-blue-600 underline"
        >
          privacy@cineniche.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        California Consumer Privacy Act (CCPA) Notice
      </h2>
      <p className="mb-2">
        If you are a California resident, you have rights under the CCPA,
        including:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>The right to know what data we collect and how it's used</li>
        <li>The right to access or delete your data</li>
        <li>The right to non-discrimination for exercising your rights</li>
      </ul>
      <p className="mb-4">
        CineNiche does not sell your personal information. To make a CCPA
        request, email{" "}
        <a href="mailto:ccpa@cineniche.com" className="text-blue-600 underline">
          ccpa@cineniche.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Copyright and Intellectual Property
      </h2>
      <p className="mb-4">
        All content on CineNiche is protected by copyright and intellectual
        property laws. Unauthorized use or distribution is strictly prohibited.
        If you believe your content has been used unlawfully, contact{" "}
        <a
          href="mailto:legal@cineniche.com"
          className="text-blue-600 underline"
        >
          legal@cineniche.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">External Links</h2>
      <p className="mb-4">
        The Service may contain links to third-party websites. CineNiche is not
        responsible for their content or privacy practices.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Updates to This Policy
      </h2>
      <p className="mb-4">
        CineNiche may update these Terms occasionally. We’ll notify you of
        material changes. Continued use of the Service means you agree to the
        latest version.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Contact</h2>
      <p className="mb-4">
        For general support:{" "}
        <a
          href="mailto:support@cineniche.com"
          className="text-blue-600 underline"
        >
          support@cineniche.com
        </a>
        <br />
        Privacy questions:{" "}
        <a
          href="mailto:privacy@cineniche.com"
          className="text-blue-600 underline"
        >
          privacy@cineniche.com
        </a>
        <br />
        CCPA requests:{" "}
        <a href="mailto:ccpa@cineniche.com" className="text-blue-600 underline">
          ccpa@cineniche.com
        </a>
      </p>
    </div>
  );
}

export default Privacy;
