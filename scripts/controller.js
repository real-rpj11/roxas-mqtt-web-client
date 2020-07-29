$(document).ready(function () {
	$('#connect_btn').click(function (e) {
		e.preventDefault();
		var connect = $("#broker_input").val();
		client = mqtt.connect(connect);
		// client.subscribe($("#topic").val());
		client.on("message", function (topic, payload) {
			var row = $("<tr>");
			$("<td>").text(topic).appendTo($(row));
			$("<td>").text(payload).appendTo($(row));
			$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
			$("#tbl-body").append($(row));
		})
		console.log('Connecting..');
		$("#display_status").text("Connecting");
		$("#display_status").removeClass("alert-secondary");
		$("#display_status").addClass("alert-warning");
		client.on("connect", function () {
			$("#display_status").text("Successfully connected");
			$("#display_status").removeClass("alert-warning");
			$("#display_status").addClass("alert alert-success");
			console.log("Successfully Connected.");
		});
	})

	//For Publish 
	$('#publish-button').click(function () {
		var topic = $('#publish-input').val();
		var payload = $('#publish-input-payload').val();
		if (topic == "" && payload == "") {
			alert("Should have the inputs");
		} else {
			if (topic == "" || payload == "") {
				alert("Error");
			} else {
				var row = $("<tr>");
				$("<td>").text(topic).appendTo($(row));
				$("<td>").text(payload).appendTo($(row));
				$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
				$("#tbl-body-pub").append($(row));
				console.log("Publish { Topic: " + $("#topic").val() + "," + " Payload: " + $("#payload").val() + "}");
				console.log("Succesfully Published")
			}
		}
	})

	//For Subscribe
	$("#subscribe-button").click(function () {
		var topic = $("#pub-input").val();
		var subTopic = $('#subscribe-input').val();
		if (subTopic == "") {
			alert("Invalid Topic")
		} else {
			var row = $("<tr>")
			$("<td>").text(topic).appendTo($(row));
			$("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
			$("#tbl-body-sub").append($(row))
			console.log("Subscribe { Topic: " + $("#topic-sub").val() + " }");

		}
	})
})