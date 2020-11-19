import React from "react";
import axios from "axios";

class DataTable extends React.Component {
    state = {
      result: [],
      filteredusers : [],
      search: ""
    };
    // looked back at activity 20 for reference

    componentDidMount() {
        this.searchEmployees();
      }
  
      searchEmployees = () => {
          axios.get("https://randomuser.me/api/?results=50")
            .then(res => {
             
              console.log(res.data.results)
              this.setState({result: res.data.results, filteredusers: res.data.results})
              console.log(this.state.result)
            })
            .catch(err => console.log(err));
            
        };
  
    
  
      render() {
          return (
            <React.Fragment>
             {/*creating a table for everything to display  */}
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>Picture</th> 
                    
                </tr>
            {this.state.filteredusers.map(user => (
                <tr>
                    {/* api calls to get users info */}
                    <td>{user.name.first} {user.name.last}</td>
                    <td> <img src= {user.picture.thumbnail}/></td>
                    
                </tr>
                
            ))}    
            
            </table>
            </React.Fragment>

          )
      }
  }
  
  
export default DataTable;

