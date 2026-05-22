import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const pageFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const content = `
<ol>
  <li>The Customer agrees that:
    <ol>
      <li>these Standard Terms and Condition of Sale / Service are legally binding between the Customer and SALT Essential Information Technology (Pty) Ltd (hereinafter called SALT) and that no alterations or additions to this Standard Terms and Condition of Sale / Services may be effected unless agreed to by both parties, reduced to writing and signed by the Customer and a duly authorized representative of SALT;</li>
      <li>these Standard Terms and Condition of Sale / Services, together with the Master Agreement, will govern all future contractual relationships between the parties;</li>
      <li>these Standard Terms and Condition of Sale / Services is final and binding and is not subject to all existing debts between the parties;</li>
      <li>these Standard Terms and Condition of Sale / Services is final and binding and is not subject to any suspensive or dissolutive conditions;</li>
      <li>these terms supersede all previous conditions of Standard Terms and Condition of Sale / Services without prejudice to any securities or guarantees held by SALT;</li>
      <li>in the event of a conflict between these Standard Terms and Conditions and the Master Agreement, the provisions of the Master Agreement shall prevail; and</li>
      <li>these terms apply to all employees and subcontractors of SALT.</li>
    </ol>
  </li>
  <li>The Customer acknowledges that it does not rely on any representations made by SALT in regard to the goods and services or any of its qualities leading up to this Standard Terms and Condition of Sale / Services other than those contained in this Standard Terms and Condition of Sale / Services. Any recommendation, formula, advice, dimension, weight, specifications, price list, performance figure, advertisement, brochure, and other technical data furnished by SALT in respect of the goods or services or orally or in writing is approximate and for information only and will not form part of the Standard Terms and Condition of Sale / Services in any way unless agreed to in writing by SALT.</li>
  <li>The Customer warrants that neither SALT nor any of its employees will be liable under any circumstances whatsoever for any loss or damage arising out of rendered services by SALT or any of its agents/employees, or the use of the items purchased, or the use by Customer of any misrepresentation, material or information referred to in Clause 2 whether furnished negligently or innocently.</li>
  <li>It is the sole responsibility of the Customer to determine that the goods or services ordered are suitable for the purposes of intended use.</li>
  <li>The Customer agrees to pay all costs resulting from any acts or omissions by the Customer including suspension of work, modification of requirements, failure or delay in giving particular requisite to enable work to proceed on schedule or requirements that work be completed earlier than agreed.</li>
  <li>If the goods / services to be provided by SALT to the Customer be unavailable, superseded, replaced or their manufacture terminated, SALT shall offer alternative goods / services to the Customer. The Customer may agree to accept the substituted goods / services or cancel the agreement, without any recourse against SALT for the unavailability or otherwise of the goods / services.</li>
  <li>All quotations will remain valid for a period of 7 days from the date of quotation if not otherwise stated on the quotation of SALT, and is subjected to clauses 8 and 9 hereto below, where applicable.</li>
  <li>All quotations are subject to the availability of the goods or services and subject to correction of good faith errors by SALT and the prices quoted are subject to any increases in the price, including, but not limited to currency fluctuations.</li>
  <li>Foreign Exchange: In the event that the South African Rand / Namibia Dollar devalues against the US Dollar or Euro from the date of this quotation, until the goods are received by SALT, SALT reserves the right to increase the amount payable by the Customer in respect of such goods by the percentage of such change. This will not generally apply if the rate of change is less than two (2) percent.</li>
  <li>If the Customer disputes the amount of increase, the amount of the increase may be certified by any independent auditor or banking institution and such certificate shall be final and binding on the Customer.</li>
  <li>The Customer hereby confirms that the goods or services on the Tax Invoice issued duly represent the goods or services ordered by the Customer at the prices agreed to by the Customer and, where delivery / performance has already taken place, that the goods or services were inspected and that the Customer is satisfied that these conform in all respects to the quality and quantity ordered and are free from any defects.</li>
  <li>Notwithstanding the provisions in clause 1 above, all orders, accepted and signed quotes or agreed variations thereto, must be in writing and shall be binding and subject to these standard conditions of Standard Terms and Condition of Sale / Services and may not be cancelled.</li>
  <li>SALT will negotiate to split the delivery / performance of the goods or services ordered in the quantities and on the dates as agreed upon with the Customer.</li>
  <li>SALT will negotiate to invoice each delivery / performance made separately should clause 13 be in effect.</li>
  <li>Any delivery note or waybill or service order (ticket), copy or original, signed by the Customer or a third party engaged to transport the goods and held by SALT shall be prima facie proof that delivery of goods was made to the Customer and are in accordance with the quality and quantity reflected thereon.</li>
  <li>The risk of damage to, destruction or theft of goods shall pass to the Customer on acceptance of any order placed in terms of this Standard Terms and Condition of Sale / Services and the Customer undertakes to comprehensively insure the goods until paid for in full. SALT may recover insurance premiums from the Customer for such ordered and uninsured goods.</li>
  <li>Delivery, installation, commencement and performance time quoted are merely estimates and not binding on SALT; time is not of the essence of this Standard Terms and Condition of Sale / Services unless expressly agreed upon in writing by SALT. SALT shall not be liable for any loss or damage of whatsoever nature which the Customer may suffer as a result of any incorrect or delayed delivery.</li>
  <li>If SALT agrees to engage a third party to transport the goods, SALT is hereby authorised, at its sole discretion, to engage a third party on the Customer's behalf and on the terms deemed fit by SALT.</li>
  <li>The Customer indemnifies SALT against any claims that may arise from such engagement in Clause 18 against SALT.</li>
  <li>Repair times and repair costs given are merely estimates and are not binding on SALT; time is not of the essence of this Standard Terms and Condition of Sale / Services unless expressly agreed upon in writing by SALT. SALT shall not be liable for any loss or damage of whatsoever nature which the Customer may suffer as a result of any unforeseen costs and/or delayed repairs.</li>
  <li>Any items handed in for repair may be sold by SALT to defray the cost of such repairs if the item remains uncollected within 30 days of the repairs being completed and the customer was duly informed of the completion of such repairs.</li>
  <li>All goods taken on a demonstration basis by the Customer are deemed sold if not returned within 7 days of issue in the original condition, in the original packaging and with all accessories and manuals intact, unless otherwise agreed upon and reduced to writing.</li>
  <li>The Customer acknowledges all intellectual property in existence in respect of the goods / services and shall not duplicate copyrights and material and that each infringement attempt shall immediately render the full prevailing price payable to SALT.</li>
  <li>The Customer shall indemnify SALT against any claims, costs and expenses arising out of the infringement of copyright, patent, trademark or design supplied by the Customer.</li>
  <li>New goods, parts and computer components are guaranteed according to the Manufacturer's product specific warranties only and all other guarantees including common law guarantees are hereby specifically excluded. Services are guaranteed for a period of 3 months against faulty workmanship.</li>
  <li>Liability under the guarantee in respect of services given under Clause 25 is restricted to the cost of repair or replacement of faulty goods or services or granting of a credit at the sole discretion of SALT.</li>
  <li>No claim under this Standard Terms and Condition of Sale / Services shall arise unless the Customer has, within 3 days of the alleged breach or defect occurring, given SALT 30 days written notice by prepaid registered post to rectify any defect or breach of Standard Terms and Condition of Sale / Services.</li>
  <li>To be valid, claims must be supported by the original Tax Invoice.</li>
  <li>The Customer shall return any defective moveable goods to the premises of SALT at the Customer's own cost and packed in the original or suitable packaging and all risks for the duration of the repair remain with the Customer. Goods returned for repair (or to be otherwise dealt with under any warranty) shall be subject to a handling charge not exceeding 15% of the total purchase price of such goods as reflected in SALT's invoice.</li>
  <li>All guarantees and warranties are immediately null and void should any goods be tampered with or should the seals be broken by anyone other than SALT or should the goods be operated or stored outside the Manufacturer's specifications.</li>
  <li>Any item delivered to SALT, shall serve as a pledge in favour of SALT for present and past debts and SALT shall be entitled to retain or realize such pledges as it deems expedient. The sworn or realized value of pledged goods will be offset against the Customer's debts and any excess balance will be paid to the Customer.</li>
  <li>Under no circumstances shall SALT be liable for any consequential damages including loss of profits or for any liability of any nature whatsoever.</li>
  <li>Under no circumstances shall SALT be liable for any damage arising from any misuse, abuse or neglect of the goods or services.</li>
  <li>Delivery of the goods or services to the Customer shall take place at the place of business of SALT or whatsoever location, as agreed upon in writing by SALT.</li>
  <li>Payment will be made strictly in accordance with the accepted provisions of the credit Standard Terms and Condition of Sale / Services as it exists between SALT and the Customer. Should no credit Standard Terms and Condition of Sale / Services exist or should such Standard Terms and Condition of Sale / Services have been cancelled by SALT and notice to that effect given to the Customer, then all purchases are made cash on order. All payment shall be payable in cash unless otherwise accepted by SALT and shall be paid by the Customer free of exchange in Namibian currency at the office of SALT or at such other place as SALT may designate in writing.</li>
  <li>Any liability of SALT under these Standard Terms and Conditions shall be limited to twice the value of the goods / services supplied by SALT under the invoice in respect of which SALT is being held liable.</li>
  <li>The Customer has no right to withhold payment for any reason whatsoever and agrees that no extension of payment of any nature shall be extended to the Customer and any such extension will not be applicable or enforceable unless agreed to by SALT, reduced to writing and signed by the Customer and a duly authorized representative of SALT.</li>
  <li>The Customer is not entitled to offset or deduct any amount due to the Customer by SALT against this debt.</li>
  <li>Any discount or rebate offered by SALT shall be forfeited if payment is not made on or before the due date.</li>
  <li>The Customer agrees that a certificate signed by any Director, Manager or Duly Authorised Representative of SALT shall be prima facie evidence of the amount due and payable to SALT by the Customer including any interest and costs for the purposes of judgment, including provisional sentence or summary judgment, and of claims against insolvent or deceased estates. Proof of the appointment or authority of the signatory shall not be required in such certificate.</li>
  <li>The Customer agrees that interest shall be payable at the maximum legal interest rate prescribed in terms of the Usury Act on any monies past due date to SALT and that interest shall be calculated daily and compounded monthly from the date of acceptance of the order.</li>
  <li>The Customer agrees that if an account is not settled in full:
    <ol>
      <li>against order; or</li>
      <li>within the period agreed in clause above in the case of a Credit Approved Customer; or</li>
      <li>if the Customer commits a breach of any of these conditions, or being an individual is provisionally or finally sequestrated or surrenders his/her estate, or being a partnership, is being dissolved, or being a company or close corporation is placed under a provisional or final order of judicial management or liquidation, or compromises or attempts to compromise generally with its creditors, or if an order in terms of section 65 of the Magistrates Court Act 32 of 1944, as amended, is issued against the Customer, or if the Customer commits or permits any act that may prejudice the rights of SALT; then in any of these events SALT may in its sole discretion either:
        <ol>
          <li>immediately institute action against the Customer at the sole expense of the Customer; or</li>
          <li>cancel the Standard Terms and Condition of Sale / Service and take possession of any goods delivered to the Customer by giving the Customer written notice to that effect; or</li>
          <li>claim damages.</li>
        </ol>
      </li>
      <li>SALT shall be entitled to immediately suspend any delivery or service while the Customer is in breach of any of the terms of any contract between it and SALT. In the event of a breach and without restricting or revoking any other rights SALT may have in law, SALT shall have the right to claim from the Customer any costs SALT might have incurred to recover and/or collect the monies owed by the Customer.</li>
      <li>Subject to the maximum costs recoverable in terms of the Magistrates Court Act 32 of 1944. These remedies are without prejudice to any other right SALT may be entitled to in terms of this Standard Terms and Condition of Sale / Service or in law.</li>
    </ol>
  </li>
  <li>A Credit Approved Customer will forthwith lose this approval when payment is not made according to the conditions as hereto set out and all amounts then outstanding shall immediately become due and payable.</li>
  <li>In the event of cancellation of a purchase order or work order, the Customer shall be liable to pay:
    <ol>
      <li>any handling and administration fee imposed by the channel;</li>
      <li>any and all products and/or services delivered up to and including the date that cancellation notice has been received and acknowledged by SALT;</li>
      <li>SALT is entitled not to produce any unmade balance of a contract and to recover any loss sustained thereby from the Customer.</li>
    </ol>
  </li>
  <li>The Customer hereby consents and irrevocably authorizes SALT to enter its premises to repossess any goods delivered and indemnifies SALT completely against any damage whatsoever relating to the removal of repossessed goods.</li>
  <li>Ownership and dominium in all goods supplied by SALT to the Customer, whether such goods are attached to other property or not, shall remain vested in SALT until such goods have been fully paid for by the Customer.</li>
  <li>The Customer is not entitled to remove any goods beyond the borders of the Republic of Namibia or to sell or dispose of any goods unless paid for in full without the prior written consent of SALT. The Customer shall not allow the goods to become encumbered in any manner prior to full payment thereof and shall advise third parties of the rights of SALT in the goods.</li>
  <li>If any goods supplied to the Customer which have not been paid for in full are of a generic nature and have become the property of the Customer by operation of law (confusio or commixtio), the Customer shall be obliged on notice of cancellation of the Standard Terms and Condition of Sale / Services to retransfer the same quantity of goods in ownership to SALT.</li>
  <li>Should any legal recourse be required to recover monies due and/or goods not paid in full, SALT will apply for the incurred legal cost to be for the account of the Customer.</li>
  <li>The Customer agrees that SALT will not be required to furnish security in terms of Rule 62 of the Rules of Court of the Magistrate's Courts or in terms of Rule 59 of the Rules of the High Court.</li>
  <li>The Customer agrees that no indulgence, relaxation, latitude or extension of time whatsoever by SALT will affect the terms of this Standard Terms and Condition of Sale / Services or any of the rights of SALT and such indulgence shall not constitute a waiver by SALT in respect of any of its rights herein. Under no circumstances will SALT be prevented from exercising any of its rights in terms of this Standard Terms and Condition of Sale / Services.</li>
  <li>The Customer hereby consents, in terms of Section 45 of the Magistrates Courts Act of 1944 as amended, to SALT instituting any proceedings arising out of this contract in the Magistrates Court of Windhoek otherwise having jurisdiction in terms of Section 28 of the Magistrates Court Act notwithstanding the fact that such proceedings are otherwise not within the jurisdiction of that court. SALT however reserves the right, in its sole discretion, to institute any action from this Standard Terms and Condition of Sale / Services in the High Court of Namibia.</li>
  <li>Any document shall be deemed duly presented to and accepted by the Customer:
    <ol>
      <li>within 3 days of prepaid registered mail to any of the Customer's business postal address or the personal address of any director, member or owner of the Customer; or</li>
      <li>within 24 hours of being emailed to any of the Customer's official email address or any director, member's or owner of the Customer's email addresses; or</li>
      <li>on being delivered by hand to the Customer or any director, member's or owner of the Customer; or</li>
      <li>within 48 hours if sent by overnight courier; or</li>
      <li>within 7 days of being sent by regular post.</li>
    </ol>
  </li>
  <li>The Customer chooses its address for legal execution the address as the business address or the physical addresses of any Director (in the case of a company), Member (in the case of a close corporation) or of the Owner(s) or Partner(s).</li>
  <li>The Customer hereby consents to the storage and use by SALT of the personal information that it has provided to SALT for establishing its credit rating and to SALT disclosing such information to credit control companies, banks and other institutions involved in rating credit. The Customer agrees that SALT will not be liable for the good faith disclosure of any of this information to such third parties and that no further specific consent needs to be obtained for the transfer of such information to a specific third party.</li>
  <li>In the event of any default by the Customer of any provision of this Standard Terms and Condition of Sale / Services, the Customer hereby consents and authorizes SALT to furnish the name, credit record and repayment history of the Customer to any credit bureau as delinquent debtor.</li>
  <li>The invalidity of any part of this Standard Terms and Condition of Sale / Services shall not affect the validity of any other part.</li>
  <li>Any order is subject to cancellation by SALT due to force majeure from any cause beyond the control of SALT, including (without restricting this clause to these instances): inability to secure labour, power, materials or supplies, war, civil disturbance, riot, state of emergency, strike, lockout, or other labour disputes, fire, flood, drought or legislation.</li>
  <li>The Customer hereby waives the benefits of the legal exception of non numeratae pecuniae, non cause debiti, de errore calculi, de duobos vel pluribus reis debendi, review of accounts and no value received and hereby declares himself to be fully acquainted with the meaning of this waiver.</li>
  <li>The Customer agrees that SALT will be immediately and irrevocably released from any contractual damages and penalty obligations should any force majeure event occur.</li>
  <li>The signatory confirms that they have accepted the Microsoft Customer Agreement as of the legal and regulatory requirements by Microsoft before any customer can install and consume their products.</li>
  <li>The signatory warrants that he is the duly authorized representative of the Customer and that he has full capacity, whether legal or otherwise, to enter into any contractual Standard Terms and Condition of Sale / Services with SALT.</li>
  <li>The invalidity of one or more of these provisions does not affect the validity of any other provision or these terms and conditions in their entirety.</li>
  <li>This Standard Terms and Condition of Sale / Services and its interpretation is subject to Namibian Law and the Customer consents to the exclusive jurisdiction of the Namibian Courts.</li>
  <li>Although the provisions of this Standard Terms and Condition of Sale / Services are self-explanatory, the Customer warrants that he has read and understands the provisions contained herein.</li>
</ol>
`

export default function Copyrights() {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="bg-[#F8FAFC]"
    >
      <Helmet>
        <title>Standard Terms & Conditions | Salt Essential IT</title>
        <meta name="description" content="Standard Terms and Conditions of Sales/Services for Salt Essential Information Technology (Pty) Ltd." />
      </Helmet>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-2 text-2xl font-bold text-[#0F172A]">Standard Terms and Conditions of Sales/Services</h1>
          <p className="mb-6 text-xs text-[#64748B]">
            © {new Date().getFullYear()} Salt Essential Information Technology (Pty) Ltd. All rights reserved.
          </p>
          <div
            className="prose prose-slate max-w-none text-sm [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha] [&_ol_ol_ol]:list-[lower-roman]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </motion.div>
  )
}
