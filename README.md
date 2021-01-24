# CheckForLiveStreams
A node Twitch API method to get live channels without fail<br /><br />

First check out the video to go with this to show how fast it works. and in the description of that video i do go in some detail to make up for the lack of audio description.<br /><a href="https://youtu.be/QS7HcpuatDU">https://youtu.be/QS7HcpuatDU</a>
<br /><br />
Now all you need to know is that the shard file is just going to hold our shards which make the api call.
<br /><br />
and the index file will emit a get event to each shard and then each shard will do its api thing and then they'll emit a answer event and that answer event will be collected in the collector in the index.js file and then when its collected all 3 shard answers it will return an array showing the live streams.
<br /><br />
also just so you know you dont have to name your shards after different types of latte's thats just what i wanted to name them cause i thought it would be fun.
