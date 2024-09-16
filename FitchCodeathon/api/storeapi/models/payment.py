from pydantic import BaseModel

class Payment(BaseModel):
    payment_method: str
    amount: float
    status: str
    transaction_id: str 

class RefundRequest(BaseModel):
    payment_id: int
    amount: float