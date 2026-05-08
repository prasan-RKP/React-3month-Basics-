import { useState } from 'react';

export default function ModalBox() {
  const [openModal, setOpenModal] = useState(false);

  const title = 'Modal Dialog';

  return (
    <div>
      {!openModal && (
        <button onClick={() => setOpenModal(true)}>
          Show Modal
        </button>
      )}

      {openModal && (
        <div className="modal-box">
          <h1>{title}</h1>

          <div>
            One morning, when Gregor Samsa woke from troubled
            dreams, he found himself transformed in his bed into
            a horrible vermin. He lay on his armour-like back,
            and if he lifted his head a little he could see his
            brown belly, slightly domed and divided by arches
            into stiff sections.
          </div>

          <button onClick={() => setOpenModal(false)}>
            Close Modal
          </button>
        </div>
      )}
    </div>
  );
}