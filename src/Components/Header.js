import React from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <div className="container">
                    <Navbar.Brand href="#home"><Link to="/" style={{ color: '#fff' }}>School Management System</Link></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link><Link>Add Student</Link></Nav.Link>
                        <Nav.Link>Courses</Nav.Link>
                    </Nav>
                    <div inline>
                        <AmplifySignOut />
                    </div>
                </div>
            </Navbar>
            {/* <br /> */}
            {/* <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar> */}
        </div>
    )
}

export default Header