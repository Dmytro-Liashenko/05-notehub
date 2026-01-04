import { useState } from 'react'
import css from './App.module.css';
import { fetchNotes } from "../../services/NoteService";
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import ErrorNotification from '../Error/ErrorNotification';

function App() {

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 1000)
  const[isModalOpen, setIsModalOpen] = useState(false)

  const {data, isError, isLoading} = useQuery({
      queryKey: ["notes", currentPage, debouncedSearch],
      queryFn: () => fetchNotes({
        page: currentPage,
        perPage,
        search: debouncedSearch || undefined
      }),
      retry: false,

  })

if(isError) return <ErrorNotification/>
if(isLoading) return <Loader/>

return (
  <>
  <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox value={search} onChange={setSearch}/>}
        {data && (<Pagination currentPage={currentPage} totalPage={data.totalPages || 0} onPageChange={setCurrentPage} />)}

                <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={()=> setIsModalOpen(false)}/>
          </Modal>
)}
      </header>
    {data && <NoteList notes={data.notes} />}
    </div>
    </>
)
}

export default App
