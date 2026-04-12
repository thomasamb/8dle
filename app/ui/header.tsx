import Image from "next/image";

export default function Header() {
  return (
    <div id="siteHeader">
      <div id="logoContainer">
        <span>
          <Image
            id="8logo"
            src="/assets/logo.png"
            alt="8"
            height={50}
            width={50}
          />
        </span>
        <span>
          <h1 className="headerText">dle</h1>
        </span>
      </div>
    </div>
  );
}
