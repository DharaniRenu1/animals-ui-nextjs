import Head from "next/head";
import { Cat } from "@/domain/cat";
import { Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import CommonForm from '@/pages/form/index'

const service = new CatsService();

interface DeleteModalProps {
  id: string;
  handledeleteStatus: () => void;
}

const DeleteModal = ({ id, handledeleteStatus }: DeleteModalProps) => {
  const [show, setShow] = useState(false);

  const handleDelete = async () => {

    try {
      const response = await fetch(
        `http://localhost:8080/api/1/cats/delete/${id}`,
        {
          method: "GET",
        }
      ).then((response) => {
        handledeleteStatus();
      });
    } catch (error) {
      console.error("There was a problem deleting the item.. Try again...");
    }
    setShow(false);
  };

  return (
    <>
      <Button
        style={{ marginBottom: 50 }}
        variant="danger"
        onClick={() => setShow(true)}
      >
        Delete
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the cat details?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default function CatPage({ cat }: { cat: Cat }) {
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [showForm, setshowForm] = useState(false)
  const handledeleteStatus = () => {
    setdeleteStatus(!deleteStatus);
  };

  const handleupdateClick = () => {
    if(!showForm){
      setshowForm(true)
   }

  }


  return (
    <>
      {deleteStatus ? (
        <div style={{ color: "green", marginBottom: 50 }}>
          Deleted successfully..
        </div>
      ) : (
        <>
              {showForm
               ? (
                  <CommonForm 
                  isEditForm={true}
                  cat={cat}
                 />
              ):(
                <main>
                <Head>
                  <title>Your cat {cat.name}</title>
                  <meta name="description" content="Register your animal" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                  <div className="row">
                    <div className="col-10">
                      <h1>Your cat {cat.name}</h1>
                    </div>
                    <div className="col-1">
                      <Button
                        style={{ marginBottom: 50 }}
                        variant="primary"
                        onClick={handleupdateClick}
                      >
                        Update
                        
                      </Button>
                    </div>
                    <div className="col-1">
                      <DeleteModal
                        id={cat.id}
                        handledeleteStatus={handledeleteStatus}
                      />
                    </div>
                  </div>
      
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>ID</td>
                        <td>{cat.id}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{cat.name}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{cat.description}</td>
                      </tr>
                    </tbody>
                  </Table>
                </main>
              )}
      

        
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const cat = await service.get({ id: context?.params?.catId });
    return { props: { cat } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
