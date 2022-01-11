import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  return (
    <div className="App">
      <h1>NewDay</h1>
      <h2 className="sub-heading">WCAG 2.1 AA Compliant modal</h2>
      <button className="open-btn" onClick={() => setModalOpen(true)}>
        Open Modal
      </button>
      {modalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
}
const Modal = ({ closeModal }) => {
  const ref = useRef();
  //making a copy of activeElement so that when modal was closed focus can be shifted back to it
  const activeElement = document.activeElement;
  let activeIndex = -1;
  let focusableElements = [];

  const handleTab = (evt) => {
    let total = focusableElements.length;
    //only tab key is pressed
    if (!evt.shiftKey) {
      // If activeIndex larger than array length focus first element otherwise focus next element
      activeIndex = activeIndex >= total - 1 ? 0 : activeIndex + 1;
      focusableElements[activeIndex].focus();
      return evt.preventDefault();
    }
    //shift+tab keys pressed
    if (evt.shiftKey) {
      // if activeIndex - 1 less than 0 focus last element otherwise focus previous element
      activeIndex = activeIndex - 1 < 0 ? total - 1 : activeIndex - 1;
      focusableElements[activeIndex].focus();
      return evt.preventDefault();
    }
  };

  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      closeModal();
    }
  };

  const keyListenersObj = { 27: handleEscape, 9: handleTab };

  const handleKeydown = (evt) =>
    keyListenersObj[evt.keyCode] && keyListenersObj[evt.keyCode](evt);

  useEffect(() => {
    if (ref.current) {
      // Select all focusable elements within ref
      focusableElements = ref.current.querySelectorAll(
        "a, button:not([disabled]), textarea, input, select"
      );
    }
  }, [ref]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      // Returns the focus to the previously focused element
      activeElement.focus();
    };
  }, []);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog1_label"
    >
      <div className="modal-container" ref={ref}>
        <button
          className="modalClose"
          aria-label="close button"
          onClick={closeModal}
          data-testid="modal-close-btn"
        ></button>
        <div className="modalContent">
          <h2 id="dialog1_label">This is a WCAG 2.1 AA Compliant modal</h2>
          <div className="formField">
            <label htmlFor="name">
              Name:
              <input type="text" id="name" data-testid="name" />
            </label>
          </div>
          <div className="dropdown">
            <label htmlFor="tech">Technologies:</label>
            <select id="tech" data-testid="select">
              <option data-testid="select-option">Javascript</option>
              <option data-testid="select-option">Typescript</option>
              <option data-testid="select-option">ReactJS</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
