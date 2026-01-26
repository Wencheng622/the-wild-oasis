import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "./useBooking.js";
import Spinner from "../../ui/Spinner";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckout } from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, error, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  if (isLoading) {
    return <Spinner />;
  }
  if (!booking) {
    return <Empty resourceName="booking" />;
  }
  const status = booking.status;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="deleteConfirm">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name="deleteConfirm">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(booking.id, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(booking.id)}>
            Check-out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check-in
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
