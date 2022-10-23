import { useSelector } from 'react-redux';
import React,{ useMemo } from 'react'
import './ArrayEmployee.css'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowUp, faArrowDown, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import  COLUMNS  from './columns';
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

function GlobalFilter({globalFilter, setGlobalFilter}) {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
            setGlobalFilter(value || undefined)
            }, 200)
    
    return (
        <span>Search:{''}
                    <input
                        value={value || ""}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        placeholder= 'Search...'
                        className='header__search__input'
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='header__search__icone' />
        </span>
    )
}

const ArrayEmployee = () => {
    const employee = useSelector((state)=>state.employee)

    const columns = useMemo(() => COLUMNS, [])
    const data = employee
    
    const tableInstance = useTable({
        columns: columns,
        data: data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
    )

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow, 
        setPageSize, 
        canPreviousPage, 
        state, 
        canNextPage, 
        nextPage, 
        previousPage, 
        setGlobalFilter,
        state: { pageIndex,  pageSize}, } = tableInstance


    return(
        <div className="table">
        <h1 className='table__title'>Current Employees</h1>
        <NavLink to='/' className="table__link">Return Home</NavLink>
        <div className='table__header'>
            <div className='table__header__entries'>
                <span>Show</span>
                <select value={pageSize}
                        className='table__header__select'
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        >
                        {[10, 20, 25, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>{pageSize}</option>
                ))}
                </select>
                <span>entries</span>
            </div>
            <div className='table__header__search'>
                <GlobalFilter
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
        </div>
            
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                        ? <FontAwesomeIcon icon={faArrowDown} className='table__content__icon' />
                                        : <FontAwesomeIcon icon={faArrowUp} className='table__content__icon' />
                                    : ''}
                                </span>
                            </th>
                        ))
                    }
                </tr>

                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <nav className='table__nav' aria-label='table navigation'>
        
        <span className='table__nav__text'>Showing<span >{Number(pageIndex + 1)}</span>to<span>{rows.length}</span>
            of 
            <span >{rows.length}</span>
        </span>

        <ul className='table__nav__list'>
                <li>
                    <button className='table__nav__list__button' onClick={() => previousPage()} disabled={!canPreviousPage}>  
                        {<FontAwesomeIcon icon={faArrowLeft} className='table__nav__list__icon--left' />  }                    
                        <span>Previous</span> 
                    </button>
                </li>
                <li>
                    <p className='table__nav__list__text'>{pageIndex + 1}</p>
                </li>
                <li>
                    <button className='table__nav__list__button' onClick={() => nextPage()} disabled={!canNextPage}>
                        <span>Next</span>
                        <FontAwesomeIcon icon={faArrowRight} className='table__nav__list__icon--right' />
                    </button>
                </li>
            </ul>
        </nav>
    </div>
)}

export default ArrayEmployee