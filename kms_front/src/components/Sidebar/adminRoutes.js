import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';

const routes = [
    {
        name : "Liste des utilisateurs",
        icon : GroupIcon,
        link : "/users"
    },
    {
        name : "Ajouter un utilisateur",
        icon : AddIcon,
        link : "/users/ajouter"
    }
];

export default routes;