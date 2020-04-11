// Components==============
import { flexUnit } from "mixins";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useToggle } from "../../../hooks";
import IEModal from "./IEModal";
// =========================

const Text = styled.p`
  ${flexUnit(2, 20, 22, "vw", "font-size")};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.s4};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

export default function IEWarning() {
  const [modalIsOpen, setModalIsOpen, toggle] = useToggle(false);

  useEffect(() => {
    const isIE = /*@cc_on!@*/ false || !!document.documentMode;
    setModalIsOpen(isIE);
  }, [setModalIsOpen]);

  return (
    <div>
      <IEModal modalIsOpen={modalIsOpen} handleChange={toggle}>
        <Text>
          Internet Explorer word sinds april 2017 niet meer ondersteund. Gebruik
          a.u.b. een moderne browser om deze site te bezoeken.
        </Text>
      </IEModal>
    </div>
  );
}
