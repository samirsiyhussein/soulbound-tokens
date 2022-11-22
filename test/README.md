# Default contract setup:
 - Use ownable for ACL
 - Use of counter for incrementing tokens Ids
 - Token ID 0 minted to owner account on deployment
 - Changing token locking status are made by function call

 ## Bug from hardhat
 FixtureSnapshotError: There was an error reverting the snapshot of the fixture.
 This might be caused by using nested loadFixture calls in a test, for example by using multiple beforeEach calls. This is not supported yet.

 Due to fixtures issues, test needs to be run seprately if they use the common fixtures many times
 