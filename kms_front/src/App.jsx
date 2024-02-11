import {Routes,Route} from "react-router-dom";
import './App.scss'
import Articles from "./routes/Articles/Articles.component";
import MainLayout from "./layouts/MainLayout/MainLayout.component";
import SignIn from "./routes/SignIn/SignIn.component";
import CheckUser from "./components/CheckUser.component";
import RedirectIfAuthenticated from "./permissions/RedirectIfAuthenticated.component";
import RequireAuth from "./permissions/RequireAuth.component";
import PageNotFound from "./routes/PageNotFound/PageNotFound.component";
import Users from "./routes/Users/Users.component";
import ListOfArticles from "./routes/Articles/ListOfArticles/ListOfArticles.component";
import RestrictTo from "./permissions/RestrictTo.component";
function App() {

  // const direction_departments = JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);
  // console.log(direction_departments);

  return (
    <div className='app'>
          <Routes>

          <Route path="/connexion" element={<RedirectIfAuthenticated />}>
            <Route index element={<SignIn />}/>
          </Route>
            

            <Route path="/" element={<RequireAuth />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<ListOfArticles />} />

                <Route path="/articles/*" element={<Articles />} />


                <Route path="/users/*" element={<RestrictTo roles={["admin"]} />}>
                  <Route path="*" element={<Users />}/>
                </Route> 

                <Route path="*" element={<PageNotFound />}/>
              </Route>
            </Route>


          </Routes>
    </div>
  )
}

export default CheckUser(App);
