import React from "react";
import axios from "axios";

class DataTable extends React.Component {
    state = {
      result: [],
      filteredusers : [],
      search: ""
    };
  
  
