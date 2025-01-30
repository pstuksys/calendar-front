import { lazy, Suspense } from "react";
import CalendarMemories from "./components/calendar-memories";
import { Container } from "./styles/container";

const LazyModal = lazy(() => import('./components/modal/modals-and-forms/add-or-edit-reminder-modal'));

const App = () => {

  return (
    <Container>
      <Suspense fallback={<div>Kraunama...</div>}>
        <LazyModal />
      </Suspense>

      <CalendarMemories/>
    </Container>
  )
}

export default App;