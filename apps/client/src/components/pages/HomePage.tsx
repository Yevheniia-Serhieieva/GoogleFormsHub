import { useGetFormsQuery } from '../../api/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormList from '../FormList/FormList';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';

export default function HomePage() {
  const { data, isLoading, isError } = useGetFormsQuery();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <>
      <Header />
      <FormList forms={data ?? []} />
    </>
  );
}
