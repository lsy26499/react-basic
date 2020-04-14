import React, { useState } from "react";
import { DATA } from "./data";
import FormArea from "./FormArea";

const Twittler = () => {
  return (
    <>
      <header id="greeting">twittler</header>
      <FormArea DATA={DATA} />
    </>
  );
};

export default Twittler;
