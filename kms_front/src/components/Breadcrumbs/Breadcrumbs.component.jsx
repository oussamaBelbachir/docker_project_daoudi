import React from 'react'
import "./Breadcrumbs.styles.scss";

import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });


  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
    console.log(event);
    console.log(event.target);
  }

function CustomBreadcrumbs() {
    return (
        <div className='breadcrumbs' role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb component="a" href="#" label="Home" icon={<HomeIcon fontSize="small" />} />
            <StyledBreadcrumb component="a" href="#" label="Category" />
            <StyledBreadcrumb component="a" href="#" label="Tmpa / Marketing" />
            <StyledBreadcrumb label="Accessories" deleteIcon={<ExpandMoreIcon />} onDelete={handleClick}
            />
          </Breadcrumbs>
        </div>
      );
}

export default CustomBreadcrumbs