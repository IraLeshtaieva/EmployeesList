import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name:"Iryna L.", salary:15000, increase: false,rise: true, id: 1},
                {name:"Alex S.", salary:3000, increase: true,rise: false, id: 2},
                {name:"Pavlo L.", salary:5000, increase: false,rise: false, id: 3}
            ],
            term: '', 
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            //const index = data.findIndex(elem => elem.id === id);

            //const before = data.slice(0, index);
            //const after = data.slice(index + 1);

            //const newArr = [...before, ...after];
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => { //почему просто имя а не this value name
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++ //как понять когда срабатывает инкримент
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return{...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1 //непонятно условие 
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term}); // {term:term}
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);   //if(item.rise) return
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length; 
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app"> 
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;