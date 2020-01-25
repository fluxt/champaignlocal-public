import React from "react";

// reactstrap components

// core components
import DefaultNavbar from "components/DefaultNavbar.js";

import PageHeaderXS from "components/Headers/PageHeaderXS.js"

import StoresSearch from "views/stores/StoresSearch.js";
import StoresCreate from "views/stores/StoresCreate.js";
import StoresUpdate from "views/stores/StoresUpdate.js";
import StoresDelete from "views/stores/StoresDelete.js";

// images
import storesPageBackground from "assets/img/fabio-mangione.jpg";

function StorePage() {
  return (
    <>
      <DefaultNavbar />
      <PageHeaderXS backgroundImage={storesPageBackground} />
      <StoresSearch />
      <StoresCreate />
      <StoresUpdate />
      <StoresDelete />
    </>
  );
}

export default StorePage;
