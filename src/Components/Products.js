import React from "react";
import UserDetails from "./UserDetails";
import BookList from "./BookList";
import { ChakraProvider } from "@chakra-ui/react";

const Products = () => {
  return (
    <div >
      {/* <h2 style={{ textAlign: "center" }}>Products</h2> */}
      {/* <div style={{textAlign:"center"}}>
        <UserDetails/>
      </div> */}
      <ChakraProvider>
      <BookList/>
      </ChakraProvider>
    </div>
  );
};

export default Products;
