Feature: Park a vehicle

    Scenario: Successfully park a vehicle
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet
        And a location
        When I park my vehicle at this location
        Then the known location of my vehicle should verify this location

    Scenario: Can't localize my vehicle to the same location two times in a row
        Given my fleet
        And a vehicle
        And I have registered this vehicle into my fleet
        And a location
        And my vehicle has been parked into this location
        When I try to park my vehicle at this location
        Then I should be informed that my vehicle is already parked at this location
