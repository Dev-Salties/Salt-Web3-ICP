import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const content = `
<p class="text-xs text-[#64748B]">Salt Essential Information Technology | Version 2023.01</p>

<h3>Declaration</h3>
<p>It is to be noted that although Namibia does not have any law governing data protection and/or privacy laws in place, Salt Essential Information Technology (Pty) Ltd, endeavors to honor and adhere to the General Data Protection Regulation as per European Union law on data protection and privacy in the European Union and the European Economic Area, as well as the Protection of Personal Information Act of South Africa.</p>

<h3>Definitions</h3>
<ul>
  <li><strong>Data protection</strong> — legal control over access to and use of data stored in computers.</li>
  <li><strong>Information privacy</strong> — the relationship between the collection and dissemination of data, technology, the public expectation of privacy, contextual information norms, and the legal and political issues surrounding them. Also known as data privacy or data protection.</li>
  <li><strong>Personal information</strong> — includes a broad range of information, or an opinion, that could identify an individual, including but not limited to a person's name and address, device identifier and account number.</li>
  <li>A <strong>person</strong> includes a natural person, corporate or unincorporated body (whether or not having separate legal personality) and that person's personal representatives, successors and permitted assigns.</li>
</ul>

<h3>Data Protection / Privacy Policy</h3>
<ol>
  <li>Until such time that Namibia has its own Data Protection law, Salt will, where possible, adhere and comply with all applicable requirements of the Data Protection Legislation of the European Union and South Africa.</li>
  <li>Without prejudice to the generality, the Customer will ensure that it has all necessary appropriate consents and notices in place to enable lawful transfer of the personal data to Salt Essential Information Technology for the duration and purposes of all solutions and/or services agreements entered into. Any such data is to be returned to the Customer when the agreement comes to term and is not extended by mutual agreement.</li>
  <li>Without prejudice to the generality, Salt Essential Information Technology shall, in relation to any personal data processed in connection with the performance of its obligations under this Agreement:
    <ol>
      <li>process that personal data only on the documented written instructions of the Customer unless Salt Essential Information Technology is required by Applicable Laws to otherwise process that personal data. Where Salt Essential Information Technology is relying on Applicable Laws as the basis for processing personal data, Salt Essential Information Technology shall promptly notify the Customer of this before performing the processing required by the Applicable Laws;</li>
      <li>ensure that it has in place appropriate technical and organizational measures, reviewed and approved by the Customer, to protect against unauthorized or unlawful processing of personal data and against accidental loss or destruction of, or damage to, personal data, appropriate to the harm that might result from the unauthorized or unlawful processing or accidental loss, destruction or damage and the nature of the data to be protected, having regard to the state of technological development and the cost of implementing any measures (those measures may include, where appropriate, pseudonymizing and encrypting personal data, ensuring confidentiality, integrity, availability and resilience of its systems and services, ensuring that availability of and access to personal data can be restored in a timely manner after an incident, and regularly assessing and evaluating the effectiveness of the technical and organizational measures adopted by it);</li>
      <li>not transfer any personal data unless the prior written consent of the Customer has been obtained and the following conditions are fulfilled:
        <ol>
          <li>Salt Essential Information Technology has provided appropriate safeguards in relation to the data transfer;</li>
          <li>the data subject has enforceable rights and effective legal remedies;</li>
          <li>Salt Essential Information Technology complies with its obligations under the Data Protection Legislation by providing an adequate level of protection to any personal data that is transferred; and</li>
          <li>Salt Essential Information Technology complies with reasonable instructions notified to it in advance by the Customer with respect to the processing of the personal data.</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>Assist the Customer, at the Customer's cost, in responding to any request from a data subject and in ensuring compliance with its obligations under the Data Protection Legislation with respect to security, breach notifications, impact assessments and consultations with supervisory authorities or regulators.</li>
  <li>Notify the Customer without undue delay and in any event no later than twenty-four (24) hours on suspecting and/or becoming aware of a personal data breach.</li>
  <li>At the written direction of the Customer, delete or return personal data and copies thereof to the Customer on termination of the service Agreement unless required by Applicable Law to store the personal data.</li>
  <li>Maintain complete and accurate records and information to demonstrate its compliance and allow for audits by the Customer or the Customer's designated auditor and immediately inform the Customer if, in the opinion of Salt Essential Information Technology, an instruction infringes the Data Protection Legislation.</li>
  <li>Indemnify the Customer against any actual loss suffered by the Customer in relation to any breach by Salt Essential Information Technology of its obligations.</li>
  <li>Salt Essential Information Technology shall strictly follow the Customer's archiving and security policies and procedures for the access, storing, using, and processing of Customer Data.</li>
</ol>
`

export default function PrivacyPolicy() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Privacy Policy | Salt Essential IT</title>
        <meta name="description" content="Salt Essential Information Technology's data protection and privacy policy, aligned with GDPR and POPIA." />
      </Helmet>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-6 text-2xl font-bold text-[#0F172A]">Privacy Policy</h1>
          <div
            className="prose prose-slate max-w-none text-sm [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha] [&_ol_ol_ol]:list-[lower-roman]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </motion.div>
  )
}
