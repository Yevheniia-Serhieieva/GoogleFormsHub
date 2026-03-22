import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FormFillPage from '../pages/FormFillPage/FormFillPage';
import FormResponsesPage from '../pages/FormResponsesPage/FormResponsesPage';
import FormBuilderPage from '../pages/FormBuilderPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/forms/new" element={<FormBuilderPage />} />
      <Route path="/forms/:id/fill" element={<FormFillPage />} />
      <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
    </Routes>
  );
}
