#!/bin/bash
scriptDir="$(dirname $0)"

# Determinate current branch by commit hash
currentBranch=$(git log --format="%H" -n 1)

MASTER=$(git log --format="%H" -n 1 origin/master)
CLIENT=$(git log --format="%H" -n 1 origin/app)

if [ "$currentBranch" = "$MASTER" ]; then
	echo "On origin/master"
	if [ -a .forcedeploy ]; then
		echo "Forcing deploy!"
		$scriptDir/run-ci-server.sh -r
	else
		$scriptDir/run-ci-server.sh
	fi

elif [ "$currentBranch" = "$CLIENT" ]; then
	echo "On origin/app"
	$scriptDir/run-ci-client.sh

else
	echo "Branch is not under CI, running tests only"
	$scriptDir/run-tests.sh
fi

exit 0
