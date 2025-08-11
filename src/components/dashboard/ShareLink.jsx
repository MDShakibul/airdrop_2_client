import React, { useState } from "react";
import { useSelector } from "react-redux";

const ShareLink = () => {
  const [buttonText, setButtonText] = useState("Copy");
  const loggedInInfo = useSelector((state) => state?.auth);

  // Handle Copy Button Click
  const handleCopyClick = () => {
    const codeText = document.querySelector(".code mark").textContent;
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = codeText;
    textarea.select();

    try {
      document.execCommand("copy");
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }

    document.body.removeChild(textarea);
  };

  return (
    <section
      id="id_memecoin_service_section"
      className={`p-6 rounded-lg bg-neutral text-neutral-content shadow-lg max-w-xl mx-auto`}
    >
      <h2 className="text-2xl font-bold uppercase mb-4 text-white">
        Share Link
      </h2>

      <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg shadow-inner mb-4">
        <span className="text-primary text-2xl">
          <i className="fa-solid fa-link"></i>
        </span>
        <span className="code flex-1 overflow-hidden">
          <mark className="bg-transparent text-sm break-all">
            {`${window.location.origin}/?ref=${loggedInInfo?.ref_code}`}
          </mark>
        </span>
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={handleCopyClick}
        >
          {buttonText}
        </button>
      </div>

      {/* Mobile Button */}
      <button
        className="btn btn-primary w-full md:hidden"
        type="button"
        onClick={handleCopyClick}
      >
        {buttonText}
      </button>
    </section>
  );
};

export default ShareLink;
