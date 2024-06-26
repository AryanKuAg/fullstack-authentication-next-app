'use client';

import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';
import apiClient from "../../../apiClient/apiClient";
import type { RootState } from '../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { remove, add } from '../../../store/counterSlice'

export interface Product {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
}

export interface User {
  _id: string, 
  username: string;
  firstName: string;
}

export interface LatestProductsProps {
  products?: Product[];
  sx?: SxProps;
}

export function LatestProducts({ products = [], sx }: LatestProductsProps): React.JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try{
        let response = await apiClient.get('/users/users');
        setUsers(response.data.users);
        
      } catch(error){
      }
    })();
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader title="Users" />
      <Divider />
      {users.length > 0 ? <List>
        {users.map((user, index) => (
          <ListItem divider={index < users.length - 1} key={user._id}>
           
            <ListItemText
              primary={user.firstName}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              secondary={user.username}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
            <Button variant={count.has(user._id)? "outlined": "contained"} onClick={() => {
              if(count.has(user._id)){
                dispatch(remove(user._id));
              }else {
                dispatch(add(user._id));
              }
            }}>
            {count.has(user._id)? "Unfollow": "Follow"}
          </Button>
          </ListItem>
        ))}
      </List> : <p style={{paddingLeft: '25px'}}>No User found!</p>}
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
