import styled from "styled-components";

// FLex unit

export function flexUnit(amount, min, max, unit = "vw", prop = "font-size") {
  const minBreakpoint = (min / amount) * 100;
  const maxBreakpoint = max ? (max / amount) * 100 : false;
  const dimension = unit === "vw" ? "width" : "height";

  return `
     @media (max-${dimension}: ${minBreakpoint}px) {
       ${prop}: ${min}px;
     }
 
     ${
       max
         ? `
       @media (min-${dimension}: ${maxBreakpoint}px) {
         ${prop}: ${max}px;
       }
     `
         : ""
     }
 
     ${prop}: ${amount}${unit}
   `;
}

// overflow fix

export const OverFlowFix = styled.div`
  overflow: hidden;
  position: relative;
`;

// Container

export const Container = styled.div`
  margin: 0 2.5%;

  @media screen and (min-width: 768px) {
    margin: 0 5%;
  }

  @media screen and (min-width: 1200px) {
    margin: 0 7.5%;
  }
`;

// Font sizes

export const Xs = styled.p`
  font-size: 14px;
`;

export const S = styled.p`
  ${flexUnit(2.5, 15, 16, "vw", "font-size")}
`;

export const M = styled.p`
  ${flexUnit(2.5, 16, 17, "vw", "font-size")}
`;

export const L = styled.p`
  ${flexUnit(2.5, 18, 19, "vw", "font-size")}
`;

// styled underline

export const StyledUnderline = styled.span`
  cursor: pointer;
  border-bottom: 1px solid
    ${({ theme: { primary } }) => primary.s4.replace("1)", "0.3)")};
  box-shadow: 0px -4px 0px ${({ theme: { primary } }) =>
      primary.s4.replace("1)", "0.3)")} inset;
  transition: 0.2s;

  &:hover {
    border-bottom: 1px solid
      ${({ theme: { primary } }) => primary.s4.replace("1)", "0)")};
    box-shadow: 0px -4px 0px ${({ theme: { primary } }) =>
        primary.s4.replace("1)", "0)")} inset;
    background-color: ${({ theme: { primary } }) =>
      primary.s4.replace("1)", "0.3)")};
  }
`;
