import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

// images

function PageHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            `url(${props.backgroundImage})`,
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1 className = "presentation-title">
            Champaign Local</h1>
            <h3 className = 'presentation-subtitle text-center'>Your one stop shop for finding local buisness in the CU Area!</h3>
            <br />
          </div>
        </Container>
      </div>
    </>
  );
}

export default PageHeader;
