import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Button from '../Button/Button';
import SearchBox from '../SearchBox/SearchBox';
import { setSearch } from './headerSlice';
import css from './Header.module.css';

export default function Header() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.header.search);

  const handleSearch = (value: string) => {
    dispatch(setSearch(value));
  };

  const navigate = useNavigate();

  return (
    <>
      <div className={css.header}>
        <SearchBox value={search} onSearchChange={handleSearch} />
        <Button
          variant="primary"
          text="Create form"
          onClick={() => navigate('/forms/new')}
        />
      </div>
    </>
  );
}
