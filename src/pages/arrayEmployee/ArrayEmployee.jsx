import { useSelector } from 'react-redux';
import { useState } from 'react'
import './ArrayEmployee.css'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars, faArrowUp, faArrowDown, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
//import SearchBar from '../../components/listOfEmployee/searchBar/searchBar';

const ArrayEmployee = () => {
    
    const data = useSelector((state)=>state.employee)

    console.log('data', data);
    
    const [employeesPerTable, setEmployeesPerTable] = useState(10);
    const [indexStart, setIndexStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearchData] = useState('');
    const [filteredData, setFilteredData] = useState('firstName');
    const [columns, setColumns] = useState([
		{ title: 'First Name', data: 'firstName', state: 'asc' },
		{ title: 'Last Name', data: 'lastName', state: '' },
		{ title: 'Start Date', data: 'startDate', state: '' },
		{ title: 'Department', data: 'department', state: '' },
		{ title: 'Date of Birth', data: 'dateOfBirth', state: '' },
		{ title: 'Street', data: 'street', state: '' },
		{ title: 'City', data: 'city', state: '' },
		{ title: 'State', data: 'state', state: '' },
		{ title: 'Zip Code', data: 'zipCode', state: '' }
	]);

    function handleChangeEmployeesPerTable (e) {
        setEmployeesPerTable(e.target.value);
        setCurrentPage(1)
        setIndexStart(0)
    }

    function nextPage() {
        if (currentPage < Math.round(data.length/employeesPerTable)) {
			setCurrentPage(currentPage + 1);
			setIndexStart(indexStart + employeesPerTable);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			setIndexStart(indexStart - employeesPerTable);
		}
    }

    function changeStateColumn(changeColumn) {
        const columnsTemplate = [...columns]
        columnsTemplate.forEach((column) => {
            if (column.data === changeColumn) {
				if (column.state === '') {
					column.state = 'asc';
				} else if (column.state === 'asc') {
					column.state = 'desc';
				} else if (column.state === 'desc') {
					column.state = 'asc';
				}
			} else {
				column.state = '';
			}
		});
        setColumns(columnsTemplate);
		setFilteredData(changeColumn);
    }

    function displayData() {
        return data
                .filter((item) => {
                    return Object.keys(item).some((key) => {
                        return item[key].toString().toLowerCase().includes(searchData);
                    });
                })
                .sort((a,b) => {
                    if(filteredData === 'zipCode') {
                        return columns.find((column) => column.data === filteredData).state === 'asc' ? a[filteredData] - b[filteredData] : b[filteredData] - a[filteredData];
                    } else {
                        return columns.find((column) => column.data === filteredData).state === 'asc' ? a[filteredData].localeCompare(b[filteredData]) : b[filteredData].localeCompare(a[filteredData]);
                    }
                });
    }

    return (

    <div className="table">
        <h1 className='table__title'>Current Employees</h1>
        <NavLink to='/' className="table__link">Return Home</NavLink>
        <div className='table__header'>
            <div className='table__header__entries'>
                <span>Show</span>
                <select className='table__header__select' onChange={handleChangeEmployeesPerTable}>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </select>
                <span>entries</span>
            </div>
    
            <div className='table__header__search'>
                <label htmlFor='table-search' >Search</label>
                <input type='text' id='table-search' className='header__search__input' placeholder='Search...' onChange={(e) => setSearchData(e.target.value)} />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='header__search__icone' />

            </div>
        </div>

        <table className='table__content'>
            <thead className='table__content__container'>
            
                <tr className='table__content__tr'>
                    {columns.map((column, idx) => (
                        <th key={'colum-'+idx} className='table__content__label'>
                            <button className='table__content__button'
                                    onClick={() => changeStateColumn(column.data)}
                            >
                                {column.title}
                                <div>
                                    {column.state === '' && <FontAwesomeIcon icon={faBars} className='table__content__icon' /> }
                                    {column.state === 'asc' && <FontAwesomeIcon icon={faArrowUp} className='table__content__icon' />}
                                    {column.state === 'desc' && <FontAwesomeIcon icon={faArrowDown} className='table__content__icon' />}
                                </div>
                            </button>
                        </th>
                    ))}
                </tr>
            
            </thead>
            <tbody className='table__content__body'>
                {displayData().slice(indexStart, indexStart + employeesPerTable).map((row, idx) => (
                    <tr key={'user-'+idx} classname=''>
                        <td className='table__content__td'>{row.firstName}</td>
                        <td className='table__content__td'>{row.lastName}</td>
                        <td className='table__content__td'>{row.startDate}</td>
                        <td className='table__content__td'>{row.department}</td>
                        <td className='table__content__td'>{row.dateOfBirth}</td>
                        <td className='table__content__td'>{row.street}</td>
                        <td className='table__content__td'>{row.city}</td>
                        <td className='table__content__td'>{row.state}</td>
                        <td className='table__content__td'>{row.zipCode}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <nav className='table__nav' aria-label='table navigation'>
            <span className='table__nav__text'>Showing
            <span >{Number(indexStart+1)} - {Number(indexStart + employeesPerTable) < displayData().length ? Number(indexStart + employeesPerTable) : displayData().length}</span>
            of
            <span >{displayData().length}</span>
            </span>
            <ul className='table__nav__list'>
                <li>
                    <button className='table__nav__list__button' onClick={prevPage} >  
                        <FontAwesomeIcon icon={faArrowLeft} className='table__nav__list__icon--left' />                      
                        <span>Previous</span> 
                    </button>
                </li>
                <li>
                    <p className='table__nav__list__text'>{currentPage}</p>
                </li>
                <li>
                    <button className='table__nav__list__button' onClick={nextPage}>
                        <span>Next</span>
                        <FontAwesomeIcon icon={faArrowRight} className='table__nav__list__icon--right' />
                    </button>
                </li>
            </ul>
        </nav>
    </div>
    )};



export default ArrayEmployee