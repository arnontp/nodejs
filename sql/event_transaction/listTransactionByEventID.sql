SELECT tst.TransactionID as transactionID,
tst.Name as name,et.Amount as amount FROM event_transaction et 
LEFT JOIN transactions tst on et.TransID =  tst.TransactionID
WHERE et.EventID = @EventID