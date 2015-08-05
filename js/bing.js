// Replace the following string with the AppId you received from the
    // Bing Developer Center.
    var AppId = "GuessingGame";

    // Bing API 2.0 code sample demonstrating the use of the
    // Image SourceType over the JSON Protocol.
    function Search(word)
    {
        var requestStr = "http://api.bing.net/json.aspx?"

            // Common request fields (required)
            + "AppId=" + AppId
            + "&Query=" + word
            + "&Sources=Image"

            // Common request fields (optional)
            + "&Version=2.0"
            + "&Market=de-DE"
            + "&Adult=Moderate"

            // Image-specific request fields (optional)
            + "&Image.Count=4"
            + "&Image.Offset=0"

            // JSON-specific request fields (optional)
            + "&JsonType=callback"
            + "&JsonCallback=SearchCompleted";

        //  var requestScript = document.getElementById("searchCallback");
        //  requestScript.src = requestStr;
         searchRequest = '<script id="searchCallback" type="text/javascript" src="' + requestStr + '"></script>';
    }

    function SearchCompleted(response)
    {
        var errors = response.SearchResponse.Errors;
        if (errors != null)
        {
            // There are errors in the response. Display error details.
            DisplayErrors(errors);
        }
        else
        {
            // There were no errors in the response. Display the
            // Image results.
            DisplayResults(response);
        }
    }

    function DisplayResults(response)
    {
        var output = document.getElementById("picframe");
        var resultsHeader = document.createElement("h4");
        var resultsList = document.createElement("ul");
        output.appendChild(resultsHeader);
        output.appendChild(resultsList);

        var results = response.SearchResponse.Image.Results;

        // Display the results header.
        resultsHeader.innerHTML = "Bing API Version "
            + response.SearchResponse.Version
            + "<br />Image results for "
            + response.SearchResponse.Query.SearchTerms
            + "<br />Displaying "
            + (response.SearchResponse.Image.Offset + 1)
            + " to "
            + (response.SearchResponse.Image.Offset + results.length)
            + " of "
            + response.SearchResponse.Image.Total
            + " results<br />";

        // Display the Image results.
        var resultsListItem = null;
        for (var i = 0; i < results.length; ++i)
        {
            resultsListItem = document.createElement("li");
            resultsList.appendChild(resultsListItem);
            resultsListItem.innerHTML = "<a href=\""
                + results[i].MediaUrl
                + "\"><img src=\""
                + results[i].Thumbnail.Url
                + "\"></a><br /><a href=\""
                + results[i].Url
                + "\">"
                + results[i].Title
                + "</a><br />Dimensions: "
                + results[i].Width
                + "x"
                + results[i].Height
                + "<br /><br />";
        }
    }

    function DisplayErrors(errors)
    {
        var output = document.getElementById("picframe");
        var errorsHeader = document.createElement("h4");
        var errorsList = document.createElement("ul");
        output.appendChild(errorsHeader);
        output.appendChild(errorsList);

        // Iterate over the list of errors and display error details.
        errorsHeader.innerHTML = "Errors:";
        var errorsListItem = null;
        for (var i = 0; i < errors.length; ++i)
        {
            errorsListItem = document.createElement("li");
            errorsList.appendChild(errorsListItem);
            errorsListItem.innerHTML = "";
            for (var errorDetail in errors[i])
            {
                errorsListItem.innerHTML += errorDetail
                    + ": "
                    + errors[i][errorDetail]
                    + "<br />";
            }

            errorsListItem.innerHTML += "<br />";
        }
    }
