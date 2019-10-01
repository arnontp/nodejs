select TOP 5 COUNT(tag.TagID),tag.Name from news_tag tag 
group by tag.Name ORDER BY COUNT(tag.TagID) DESC