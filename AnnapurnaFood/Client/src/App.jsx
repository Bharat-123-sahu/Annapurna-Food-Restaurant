import Badge from "./components/Utils/Badge";
import Breadcrumb from "./components/Utils/Breadcrumb";
import ChatWidget from "./components/Utils/ChatWidget";
import EmptyState from "./components/Utils/EmptyState";
import ErrorBoundary from "./components/Utils/ErrorBoundary";
import FileUploader from "./components/Utils/FileUploader";
import ImageUploader from "./components/Utils/ImageUploader";
import MapComponent from "./components/Utils/MapComponent";
import NotificationBell from "./components/Utils/NotificationBell";
import RatingStars from "./components/Utils/RatingStars";
import SupportPopup from "./components/Utils/SupportPopup";
import Tag from "./components/Utils/Tag";
import ThemeSwitcher from "./components/Utils/ThemeSwitcher";

function App() {
  return (
    <>
    <Badge/>
    {/* <Breadcrumb/> */}
    <ChatWidget/>
    <EmptyState/>
    <ErrorBoundary/>
    <FileUploader/>
    <ImageUploader/>
    <MapComponent/>
    <NotificationBell/>
    <RatingStars/>
    <SupportPopup/>
    <Tag/>
    <ThemeSwitcher/>

    </>
  );
}

export default App;
