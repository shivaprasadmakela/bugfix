import { 
    useLearning,
    Home,
    CourseDetail,
    LessonReader,
    Dashboard,
    Certificate
} from '../features/learning';
import { 
    HomeIcon, 
    UserIcon, 
    CatalogIcon, 
    PathsIcon, 
    CollectionsIcon, 
    SubscriptionsIcon, 
    OrganizationsIcon 
} from '../shared/components/Icons';
import styles from './App.module.css';


export default function App() {
    const {
        activeView,
        changeView,
        courses,
        currentCourse,
        activeLesson,
        progress,
        profile,
        isLoading,
        error,
        theme,
        toggleTheme,
        selectCourse,
        selectLesson,
        markLessonCompleted,
        submitQuiz,
        resetAllProgress,
        saveProfile
    } = useLearning();

    if (isLoading && courses.length === 0) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.spinner}></div>
                <p>Loading Bugfix Academy Platform...</p>
            </div>
        );
    }

    return (
        <div className={`${styles.appRoot} ${theme === 'dark' ? 'dark-theme' : ''}`}>
            {error && (
                <div className={styles.errorBanner}>
                    <p>⚠️ {error}. Please ensure the Spring Boot server is running on port 8081.</p>
                </div>
            )}

            <div className={styles.appLayout}>
                {/* Shared Sticky Sidebar Navigation */}
                <aside className={styles.sidebar}>
                    <div 
                        className={`${styles.navItem} ${(activeView === 'HOME' || activeView === 'COURSE_DETAIL') ? styles.navItemActive : ''}`}
                        onClick={() => changeView('HOME')}
                        title="Home"
                    >
                        <HomeIcon size={20} />
                        <span className={styles.navLabel}>Home</span>
                    </div>
                    <div 
                        className={`${styles.navItem} ${(activeView === 'DASHBOARD' || activeView === 'CERTIFICATE') ? styles.navItemActive : ''}`}
                        onClick={() => changeView('DASHBOARD')}
                        title="Dashboard"
                    >
                        <UserIcon size={20} />
                        <span className={styles.navLabel}>Dashboard</span>
                    </div>
                    <div 
                        className={styles.navItem}
                        onClick={() => changeView('HOME')}
                        title="Catalog"
                    >
                        <CatalogIcon size={20} />
                        <span className={styles.navLabel}>Catalog</span>
                    </div>
                    <div 
                        className={styles.navItem}
                        onClick={() => selectCourse(1)}
                        title="Paths"
                    >
                        <PathsIcon size={20} />
                        <span className={styles.navLabel}>Paths</span>
                    </div>
                    <div className={styles.navItem} title="Collections">
                        <CollectionsIcon size={20} />
                        <span className={styles.navLabel}>Collections</span>
                    </div>
                    <div className={styles.navItem} title="Subscriptions">
                        <SubscriptionsIcon size={20} />
                        <span className={styles.navLabel}>Subscriptions</span>
                    </div>
                    <div className={styles.navItem} title="Organizations">
                        <OrganizationsIcon size={20} />
                        <span className={styles.navLabel}>Organizations</span>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className={styles.mainContent}>
                    {activeView === 'HOME' && (
                        <Home 
                            courses={courses}
                            progress={progress}
                            profile={profile}
                            theme={theme}
                            toggleTheme={toggleTheme}
                            onSelectCourse={selectCourse}
                            onResetProgress={resetAllProgress}
                            onChangeView={changeView}
                        />
                    )}

                    {activeView === 'COURSE_DETAIL' && (
                        <CourseDetail 
                            course={currentCourse}
                            progress={progress}
                            onBack={() => changeView('HOME')}
                            onStartLesson={selectLesson}
                        />
                    )}

                    {activeView === 'LESSON_READER' && currentCourse && (
                        <LessonReader 
                            course={currentCourse}
                            lesson={activeLesson}
                            progress={progress}
                            onBack={() => selectCourse(currentCourse.id)}
                            onSelectLesson={selectLesson}
                            onMarkCompleted={markLessonCompleted}
                            onSubmitQuiz={submitQuiz}
                            onChangeView={changeView}
                        />
                    )}

                    {activeView === 'DASHBOARD' && (
                        <Dashboard 
                            courses={courses}
                            progress={progress}
                            profile={profile}
                            onBack={() => changeView('HOME')}
                            onResetProgress={resetAllProgress}
                            onSelectCourse={selectCourse}
                            onSaveProfile={saveProfile}
                            onChangeView={changeView}
                        />
                    )}

                    {activeView === 'CERTIFICATE' && (
                        <Certificate 
                            course={currentCourse || (courses.length > 0 ? courses[0] : null)}
                            profile={profile}
                            onBack={() => changeView('DASHBOARD')}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
