import { useState } from 'react';
import '../GreatFrontend/css/tab.css'

export default function Tabs() {

    const [tab, setTab] = useState('HTML');
    let tabs = ['HTML', 'CSS', 'JavaScript'];

    return (
        <div>
            <div class='btn'>
                {tabs.map((item, idx) =>
                    <button class={tab === item ? "active" : ""} key={idx} onClick={() => setTab(item)}>{item}</button>
                )}
            </div>
            <div>

                {tab === "HTML" ? (
                    <p>
                        The HyperText Markup Language or HTML is the
                        standard markup language for documents designed to
                        be displayed in a web browser.
                    </p>
                ) : tab === "CSS" ? (
                    <p>
                        Cascading Style Sheets is a style sheet language
                        used for describing the presentation of a document
                        written in a markup language such as HTML or XML.
                    </p>
                ) : tab === "JavaScript" ? (
                    <p>
                        JavaScript, often abbreviated as JS, is a
                        programming language that is one of the core
                        technologies of the World Wide Web, alongside HTML
                        and CSS.
                    </p>
                ) : null}
            </div>
        </div>
    );
}
