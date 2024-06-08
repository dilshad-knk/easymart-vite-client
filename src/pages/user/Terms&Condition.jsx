import React from 'react'
import { Card } from 'react-bootstrap'

const TermsCondition = () => {
  return (
    <Card className='shadow p-5'>
              <header>
        <h1>Terms and Conditions</h1>
        <p>Last updated on Jun 3, 2024</p>
    </header>

    <section>
        <h2>Introduction</h2>
        <p>For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean Easy Mart, whose registered/operational office is 03/468, PALLIPPADI, Malappuram, KERALA 679331. "you", “your”, "user", “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.</p>
    </section>

    <section>
        <h2>General</h2>
        <ul>
            <li>The content of the pages of this website is subject to change without notice.</li>
            <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
            <li>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable.</li>
            <li>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
            <li>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</li>
            <li>We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</li>
        </ul>
    </section>


    <footer>
        <p>If you have any questions or concerns about our Terms and Conditions, please contact us at <a href="mailto:easy.help.mart@gmail.com">easy.help.mart@gmail.com</a>.</p>
    </footer>
    </Card>
  )
}

export default TermsCondition