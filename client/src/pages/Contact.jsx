// Contact page.
// The headings come from the dashboard (Pages -> Contact); the phone, email and address
// come from Dashboard -> Site settings. To change a text, see content/contactContent.js and content/schema.js.
import { usePage, useSite } from '../context/ContentContext';
import { getContactContent } from '../content/contactContent';
import PageBanner from '../components/PageBanner';
import EnquiryForm from '../components/EnquiryForm';
import { icons } from '../components/icons';

export default function Contact() {
  const c = usePage('contact'); // the text lookup for this page (also sets the page title and SEO tags)
  const { phone, email, address, mapSrc } = useSite(); // contact details from Site settings

  const contact = getContactContent(c);

  return (
    <>
      {/* ============ BANNER ============ */}
      <PageBanner image={contact.banner.image} title={contact.banner.title} crumb="Contact" />

      {/* ============ CONTACT DETAILS AND FORM ============ */}
      <section className="section-off contact-section">
        <div className="container">
          {/* heading and text across the full width, then the contact details and the form side by side below it */}
          <div className="contact-intro reveal">
            {contact.intro.smallHeading && <span className="eyebrow">{contact.intro.smallHeading}</span>}
            {contact.intro.heading && <h2 className="mt-14">{contact.intro.heading}</h2>}
            {contact.intro.text && <p className="lede mt-14">{contact.intro.text}</p>}
          </div>
          <div className="grid-2 align-start mt-40">
            <div>
              <div className="contact-box-grid">
                {address && (
                  <div className="contact-box reveal">
                    <div className="icon">{icons.pin}</div>
                    <div>
                      <h4>{contact.visitTitle}</h4>
                      <p>{address}</p>
                    </div>
                  </div>
                )}
                {phone && (
                  <div className="contact-box reveal">
                    <div className="icon">{icons.phone}</div>
                    <div>
                      <h4>{contact.callTitle}</h4>
                      <p>{phone}</p>
                    </div>
                  </div>
                )}
                {email && (
                  <div className="contact-box reveal">
                    <div className="icon">{icons.mail}</div>
                    <div>
                      <h4>{contact.emailTitle}</h4>
                      <p>{email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* ============ MAP ============ */}
      {mapSrc && (
        <section className="section-white map-section">
          <iframe className="map-frame" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Altiora Business Advisory location — ${address}`}></iframe>
        </section>
      )}
    </>
  );
}
