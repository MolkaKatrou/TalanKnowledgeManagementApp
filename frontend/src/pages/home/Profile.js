import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, makeStyles } from "@material-ui/core"
import styled from "styled-components";
import Home from './Home';
import { Avatar, Button, ButtonGroup, ChakraProvider, Editable, EditableInput, EditablePreview, Flex, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useEditableControls } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeContext } from '../../Context/HomeContext';
import { setUser, UpdateUser } from '../../Redux/Actions/authActions';
import store from '../../Redux/store'
import UploadIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import CategoriesModal from '../../Components/CategoriesModal';
import { createCategoryList } from '../../utils/functions';
import { useParams } from 'react-router-dom';
import Post from '../../Components/posts/Post';
import { getAllPosts } from '../../Redux/Actions/postsActions';
import Question from '../../Components/Questions&Answers/Question';



const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100%',
    backgroundColor: 'rgb(225, 228, 232)'
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '250px'
  },
}));

function Profile() {
  const { id } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const categoryModal1 = useDisclosure()
  const categoryModal2 = useDisclosure()
  const { token } = useContext(HomeContext)
  const classes = useStyles()
  const [image, setImage] = useState("")
  const auth = useSelector(state => state.auth)
  const categoriesList = useSelector(state => state.categories)
  const postsList = useSelector(state => state.posts)
  const questionsList = useSelector(state => state.questions)
  const CreatedCategories = createCategoryList(categoriesList.categories).filter(cat => cat?.createdby?._id === id)
  const FollowedCategories = createCategoryList(categoriesList.categories).filter(cat => cat?.followers?.includes(id))
  const Createdposts = postsList.posts.filter(post => post?.createdby?._id === id)
  const Createdquestions = questionsList.questions.filter(post => post?.createdby?._id === id)
  const allcreated = Createdposts.concat(Createdquestions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  
  useEffect(() => {
    if (image) {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "knowledge-sharing")
      data.append("cloud_name", "knowledgetalent123")
      fetch("https://api.cloudinary.com/v1_1/knowledgetalent123/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          fetch('/Api/users/update/updatePicture', {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
              pic: data.url
            })
          }).then(res => res.json())
            .then(result => {
              console.log(result)
              var args = JSON.parse(localStorage.getItem("user"));
              args["pic"] = result.pic;
              localStorage.setItem("user", JSON.stringify(args));
              store.dispatch(setUser(JSON.parse(localStorage?.getItem('user'))))
            })

        })
        .catch(err => {
          console.log(err)
        })
    }


  }, [localStorage, image])

  const updatePhoto = (file) => {
    setImage(file)
  }

  const deletePhoto = () => {
    fetch('/Api/users/update/updatePicture', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        pic: ""
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setImage('')
        var args = JSON.parse(localStorage.getItem("user"));
        args["pic"] = result.pic;
        localStorage.setItem("user", JSON.stringify(args));
        store.dispatch(setUser(JSON.parse(localStorage?.getItem('user'))))
      })
  }

  const renderLatestAllCreated = allcreated.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).map((item, index) => (
    <>
      {item.content ?
        <Grid key={item._id}>
          <Post post={item} />
        </Grid>
        :
        <Grid key={item._id}>
          <Question question={item} />
        </Grid>
      }
    </>
  )
  )


  return (
    <Home>
      <Container className={classes.container}>

        <ArtCard>
          <UserInfo>
            <CardBackground />
            <a>

              <ChakraProvider>
                <Avatar onClick={onOpen} size='lg' style={{ cursor: 'pointer' }} name={auth.user.fullname} src={auth.user.pic}></Avatar>
                <Modal
                  size='sm'
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader> Change Profile Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} className='d-flex'>
                      <div>
                        <FormControl>
                          <label htmlFor="profilePhoto">
                            <input
                              accept="image/*"
                              id="profilePhoto"
                              type="file"
                              style={{ display: 'none', cursor: 'pointer' }}
                              onChange={(e) => updatePhoto(e.target.files[0])}
                            />
                            <AddPhotoText> <UploadIcon /> Upload a photo</AddPhotoText>
                          </label>
                        </FormControl>
                        <FormControl mt={4}>
                          <label>
                            <input
                              style={{ display: 'none', cursor: 'pointer' }}
                              onClick={deletePhoto}

                            />
                            <AddPhotoText><DeleteIcon /> Delete the photo</AddPhotoText>
                          </label>
                        </FormControl>
                      </div>
                      <div style={{ marginLeft: '60px' }}>
                        <Avatar onClick={onOpen} size='lg' style={{ cursor: 'pointer', width: 100, height: 100 }} name={auth.user.fullname} src={auth.user.pic}></Avatar>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={onClose} colorScheme='blue' mr={3}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </ChakraProvider>


              <Link>Welcome, there!</Link>
            </a>
          </UserInfo>
          <Widget>

            <div className='d-flex mx-2'>
              <WorkIcon style={{ color: 'rgb(191, 205, 222)' }} />
              <h1 className='mx-2 mt-1'>{`${auth.user.occupation}, Talan Consulting`}</h1>
              <img style={{ width: '15px' }} src='/favicon.ico'></img>
            </div>
          </Widget>
          <Item>
            <span onClick={categoryModal1.onOpen} style={{ cursor: 'pointer' }}>
              My Categories
            </span>
            <CategoriesModal
              categoryModal={categoryModal1}
              title="Categories I Created"
              categories={CreatedCategories}
            ></CategoriesModal>
          </Item>
        </ArtCard>

        <CommunityCard>

          <a>
            <span onClick={categoryModal2.onOpen} style={{ cursor: 'pointer' }}>Followed Categories</span>
            <CategoriesModal
              categoryModal={categoryModal2}
              title="Categories I Follow"
              categories={FollowedCategories}

            ></CategoriesModal>

          </a>
          <a>
            <span>My activities</span>
          </a>
        </CommunityCard>


        
          <PostsCard>
     
            {renderLatestAllCreated }
       
            </PostsCard>

      

      </Container>
    </Home>
  )
}


const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Card = styled.div`
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;


const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("/photos/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;



const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 15px;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 400;
  cursor:pointer;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

const Item = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`

  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    &:hover {
      color: #0a66c2;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        color: #0a66c2;
      }
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

const PostsCard = styled(Card)`
  padding: 10px 0 0;
  }
`;

export default Profile