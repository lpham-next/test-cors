"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createHash } from 'crypto'

export default function Home() {
  const [key, setKey] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [signature, setSignature] = useState("");
  const [timestamp, setTimestamp] = useState(0);
  const [affiliateName, setAffiliateName] = useState("Tivly");

  function loadScript() {

    const script = document.createElement("script");

    script.src = "https://uat.nextinsurance.com/ni-sdk.bundle.js";
    script.async = true;

    document.body.appendChild(script);
  }

  function onSubmit() {
    setTimestamp(Date.now());
    var string = key + timestamp + customerId;
    var hash = createHash('sha256').update(string).digest('hex');
    setSignature(hash);
    loadScript();
  }

  return (
    <main className="">
      <input
        placeholder="Key"
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <input
        placeholder="Customer Id"
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <input
        placeholder="Affiliate Name"
        type="text"
        value={affiliateName}
        onChange={(e) => setAffiliateName(e.target.value)}
      />

      <button onClick={onSubmit}>Launch</button>
      <div
        className="next-insurance-button"
        data-signature={signature}
        data-timestamp={timestamp}
        data-env="sandbox"
        data-partner-request-id={customerId}
        data-affiliate-name={affiliateName}
      ></div>
    </main>
  );
}
