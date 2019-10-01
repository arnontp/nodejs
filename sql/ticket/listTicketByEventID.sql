SELECT tk.TicketID as id,
    tk.Code as code,
    tk.Number as number,
    tk.Type as type,
    tk.Status as status,
    tk.Hash as hash,
    convert(varchar, tk.CreateDate, 20)  as date,
    ev.Title as eventTitle,
    ev.Type as eventType,
    CONCAT(@Url,'?TicketID=',tk.TicketID,'&Hash=',tk.Hash) as qr
FROM event_ticket tk
    LEFT JOIN events ev ON tk.EventID = ev.EventID
WHERE tk.Active = 1 AND tk.EventID = @EventID AND tk.Code = @Code AND tk.Status = @Status
