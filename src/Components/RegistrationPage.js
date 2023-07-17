import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { default as axios } from 'axios';
import { toast } from 'react-toastify';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import InputAdornment from '@mui/material/InputAdornment

const RegistrationPage = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };
  const [user, setUser] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log("User detail:", res.data);
      setUser(res.data);
    });
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const handleSubmit = async (values) => {
    // console.log('Submitted', values);
    const requestData = {
      userFirstname: values.firstName,
      userLastname: values.lastName,
      userEmail: values.email,
      userRole: values.role,
      userPassword: values.password,
    };
    const res = await axios
      .post("https://jsonplaceholder.typicode.com/posts", requestData)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data.id);
          toast.success("Registration successful with API", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }).catch();

    axios.delete("https://jsonplaceholder.typicode.com/posts/1", requestData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.id);
          toast.success("Data deleted successfully with API", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }).catch();
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form style={{ width: '100%' }}>
            <Box
              component="div"
              sx={{
                '& .MuiTextField-root': { m: 0.5 },
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto',
                padding: '20px',
                borderRadius: '5px',
              }}
            >
              <h1 style={{ textAlign: 'center' }}>Registration Page</h1>
              <h3>Personal Information</h3>
              <hr style={{ color: 'black' }} />
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <Field
                    name="firstName"
                    label="First Name"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                  <Field
                    name="lastName"
                    label="Last Name"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <Field
                    name="email"
                    label="Email"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                  <FormControl style={{ text: 'Role' }} fullWidth>
                    <Field
                      name="role"
                      variant="outlined"
                      as={Select}
                      label="Role"
                      error={touched.role && !!errors.role}
                      helperText={touched.role && errors.role}
                    >
                      <MenuItem value="" disabled>Select Role</MenuItem>
                      <MenuItem value="seller">Seller</MenuItem>
                      <MenuItem value="buyer">Buyer</MenuItem>
                    </Field>
                  </FormControl>
                </div>
              </div>
              <h3>Login Information</h3>
              <hr style={{ color: 'black' }} />
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <Field
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                  <Field
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <Button variant="contained" type="submit" style={{ marginTop: '20px', alignSelf: 'flex-start' }}>
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationPage;
