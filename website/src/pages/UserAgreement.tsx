import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const content = `
<p>By accessing and using the Salt Essential Information Technology website (salt.na), you accept and agree to be bound by the following terms of use. If you do not agree to these terms, please do not use this website.</p>

<h3>Acceptance of Terms</h3>
<p>Your use of this website constitutes your agreement to these terms and conditions. Salt Essential Information Technology (Pty) Ltd reserves the right to modify these terms at any time. Continued use of the website following any changes constitutes your acceptance of the revised terms.</p>

<h3>Permitted Use</h3>
<p>This website is provided for informational and business purposes. You agree to use it only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use of the website. Prohibited conduct includes, but is not limited to:</p>
<ul>
  <li>Transmitting any unsolicited or unauthorised advertising or promotional material.</li>
  <li>Attempting to gain unauthorised access to any part of the website or its related systems.</li>
  <li>Using the website to transmit harmful, offensive, or fraudulent content.</li>
  <li>Scraping, crawling, or otherwise extracting data from the website in bulk without prior written consent.</li>
</ul>

<h3>Intellectual Property</h3>
<p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Salt Essential Information Technology (Pty) Ltd or its content suppliers and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this website without express written permission from Salt Essential Information Technology (Pty) Ltd.</p>

<h3>Disclaimer of Warranties</h3>
<p>This website and its content are provided on an "as is" basis without warranties of any kind, either express or implied. Salt Essential Information Technology (Pty) Ltd does not warrant that the website will be uninterrupted or error-free, that defects will be corrected, or that the website or the server that makes it available are free of viruses or other harmful components.</p>

<h3>Limitation of Liability</h3>
<p>To the fullest extent permitted by applicable law, Salt Essential Information Technology (Pty) Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your access to or use of (or inability to access or use) this website or its content.</p>

<h3>Third-Party Links</h3>
<p>This website may contain links to third-party websites. These links are provided for your convenience only. Salt Essential Information Technology (Pty) Ltd has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>

<h3>Privacy</h3>
<p>Your use of this website is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these terms by reference.</p>

<h3>Governing Law</h3>
<p>These terms and conditions are governed by and construed in accordance with the laws of the Republic of Namibia. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the Namibian courts.</p>

<h3>Contact</h3>
<p>If you have any questions about these terms, please contact us at <a href="mailto:contact@salt.na">contact@salt.na</a>.</p>
`

export default function UserAgreement() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>User Agreement | Salt Essential IT</title>
        <meta name="description" content="Terms of use for the Salt Essential Information Technology website." />
      </Helmet>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-6 text-2xl font-bold text-[#0F172A]">User Agreement</h1>
          <div
            className="prose prose-slate max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </motion.div>
  )
}
