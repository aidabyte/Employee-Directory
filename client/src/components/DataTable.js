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

         sortName = () => {
           
            const sortEmployees = this.state.result.sort(function(a, b){
              var nameA=a.name.first.toLowerCase(), nameB=b.name.first.toLowerCase();
              if (nameA < nameB) //sort string ascending
               return -1;
              if (nameA > nameB)
               return 1;
              return 0; //default return value (no sorting)
             });
            //  line 39 displays the employees on the page
            this.setState({sortEmployees})
             for (let index = 0; index < sortEmployees.length; index++) {
              console.log(sortEmployees[index].name.first);
             }
      
          }
      

        handleChange = event => {
 
            this.setState({
             search: event.target.value 
         }, () => { 
             if (this.state.search === ""){
                 this.setState({filteredusers: this.state.result})
             }
             else {
                 let filteredusers = this.state.result.filter(user => {
                     return user.name.first.slice(0, this.state.search.length).toLowerCase()=== this.state.search.toLowerCase()
         
                 })
                 this.setState({filteredusers})
     
             }
             
            
           
         })
     }
     
  
    
  
      render() {
          return (
            <React.Fragment>
             {/*creating a table for everything to display  */}
             <input type="text" value= {this.state.search} onChange= {this.handleChange}></input>

            <table>
                <tr>
                    <th onClick={()=>this.sortName()}>Full Name</th>
                    <th>Picture</th> 
                    <th>Age</th>
                    <th>Country</th>
                    
                </tr>
            {this.state.filteredusers.map(user => (
                <tr>
                    {/* api calls to get users info */}
                    <td>{user.name.first} {user.name.last}</td>
                    <td> <img src= {user.picture.thumbnail}/></td>
                    <td>{user.dob.age}</td>
                    <td>{user.location.country}</td>
                    
                </tr>
                
            ))}    
            
            </table>
            </React.Fragment>

          )
      }
    }
  
  
export default DataTable;

