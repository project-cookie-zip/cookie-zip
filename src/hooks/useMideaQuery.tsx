import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// export const Desktop = ({ children }: any) => {
//   const isDesktop = useMediaQuery({
//     minWidth: 481,
//   });
//   return isDesktop ? children : null;
// };

export const Mobile = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const checkResize = () => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    checkResize();
  }, [isMobile]);

  window.addEventListener(`resize`, checkResize);

  return mobile;
};
