import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value //запись свойства в объект
        })
    }

    onSubmit = (e) => { // вот этот кусочек непонятно почему здесь и почему только имя и зп
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }
     
    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    // onSubmit={(e) => {  Пашка мне написал
                    //     e.preventDefault();
                    //     onAdd()
                    // }}
                    className="add-form d-flex"
                    onSubmit = {this.onSubmit}> 
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name} 
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в €?" 
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}/>
                    <button type="submit"
                            className="btn btn-outline-light"
                            //почему мы сюда не вешаем обработчик
                            >Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;